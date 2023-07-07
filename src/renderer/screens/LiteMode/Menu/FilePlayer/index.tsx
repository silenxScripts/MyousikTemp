import React, { useMemo, useState, useEffect, useRef, useContext } from "react";
import * as Tone from "tone";
import { Tooltip } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import styles from "./styles.module.scss";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Replay5Icon from "@mui/icons-material/Replay5";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import Forward5Icon from "@mui/icons-material/Forward5";
import LoopIcon from "@mui/icons-material/Loop";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { LOAD_LITE_AUDIO } from "../../../../../ipcEvents";
import returnSecondsToTimeString from "renderer/common/utils/returnSecondsToTimeString";
import { useDispatch, useSelector } from "react-redux";
import StoreTypeDef from "renderer/common/data/appStore/store/storeTypeDef";
import setVolume from "renderer/stateManager/store/actions/setVolume";
import { Context } from "renderer/stateManager/context/appContext";
import { errorType } from "renderer/common/data/appContext/alertStateTypesData";

type props = {
  filePath: string;
  playList?: Array<string>;
};

const FilePlayer = ({ filePath, playList = [] }: props) => {
  const { setAlertState, setLiteDirectFilePath, setIsLoading } =
    useContext(Context);
  const volume = useSelector((state: StoreTypeDef) => state.volume);
  const dispatch = useDispatch();

  const [audioVolume, setAudioVolume] = useState<number>(volume * 100);
  const [timerValue, setTimerValue] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [audioFullDuration, setAudioFullDuration] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [toLoopOne, setToLoopOne] = useState<boolean>(false);
  const player = useRef<Tone.Player | null>();

  const fileTitle = useMemo(() => {
    const filePathSplitList = filePath.split("\\");
    const fileTitle = filePathSplitList[filePathSplitList.length - 1];
    return fileTitle;
  }, [filePath]);

  const handleAudioVolumeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setAudioVolume(newValue as number);
    if (player.current) {
      // change the volume here
      const volumeValue = (newValue as number) / 100; // Scale the value to a range between 0 and 1
      player.current.volume.value = Tone.gainToDb(volumeValue);
      dispatch(setVolume(volumeValue));
    }
  };

  const handleTimerChange = (event: Event, newValue: number | number[]) => {
    setIsSeeking(true);
    setTimerValue(newValue as number);
    let updatedPlayerCount = ((newValue as number) * audioFullDuration) / 100;
    setPlayerCount(updatedPlayerCount);
    if (player.current) {
      player.current.stop();
      player.current.start(0, updatedPlayerCount);
      setIsPlaying(true);
    }
  };

  const handleAudioPause = () => {
    if (player.current) {
      player.current.stop();
      setIsPlaying(false);
    }
  };

  const handleAudioPlay = () => {
    if (player.current) {
      player.current.start(0, playerCount);
      setIsPlaying(true);
    }
  };

  const skipPastFive = (toSkip: boolean) => {
    setIsPlaying(true);
    if (!player.current) return;
    if (toSkip) {
      player.current.stop();
      if (playerCount + 5 >= audioFullDuration) {
        setPlayerCount(0);
        player.current.start(0, 0);
        return;
      }
      setPlayerCount((currentPlayerCount) => currentPlayerCount + 5);
      player.current.start(0, playerCount);
      return;
    }
    if (playerCount - 5 <= 0) {
      player.current.stop();
      setPlayerCount(0);
      player.current.start(0, 0);
      return;
    }
    player.current.stop();
    setPlayerCount((currentPlayerCount) => currentPlayerCount - 5);
    player.current.start(0, playerCount);
  };

  const loadAudio = () => {
    setPlayerCount(0);
    window.electron.ipcRenderer.sendMessage(LOAD_LITE_AUDIO, filePath);
    window.electron.ipcRenderer.once(
      LOAD_LITE_AUDIO,
      async ({ bufferArray, duration }) => {
        setAudioFullDuration(duration);
        try {
          const decodedBuffer = await Tone.context.decodeAudioData(bufferArray);
          const playerObj = new Tone.Player(decodedBuffer).toDestination();
          player.current = playerObj;
          setIsLoaded(true);
          setIsLoading(false);
          handleAudioPlay();
        } catch (error) {
          // Gotta add logic to show error while loading the audio
          setIsLoaded(false);
          setAlertState({
            messages: [
              "There's been a problem loading the file.",
              "Try again or check if file is corrupted.",
            ],
            mode: errorType,
          });
          setLiteDirectFilePath("");
        }
      }
    );
  };

  useEffect(() => {
    setIsLoading(true);
    loadAudio();
    setAudioVolume(volume * 100);

    return () => {
      if (player.current) {
        player.current.stop();
        player.current.dispose();
        setIsLoaded(false);
      }
      setPlayerCount(0);
    };
  }, [filePath]);

  useEffect(() => {
    let playerCountInterval = null;

    if (isPlaying) {
      playerCountInterval = setInterval(() => {
        setPlayerCount((currentCount) => currentCount + 1);
      }, 1000);
    }

    return () => {
      clearInterval(playerCountInterval);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!player.current) return;
    if (playerCount >= audioFullDuration) {
      player.current.stop();
      setPlayerCount(0);
      setIsPlaying(false);
      setTimerValue(0);
      if (toLoopOne) {
        player.current.start();
        setIsPlaying(true);
        return;
      }
    }
    if (isSeeking) return;
    setTimerValue((playerCount / audioFullDuration) * 100);
  }, [playerCount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Currently Playing...</h1>
        <h1>{fileTitle.slice(0, 100)}</h1>
      </div>
      <div className={styles.beat_view}></div>
      <div
        className={styles.player_wrapper}
        style={{
          opacity: isLoaded ? "1" : ".5",
          pointerEvents: isLoaded ? "all" : "none",
        }}
      >
        <div className={styles.player}>
          <div className={styles.buttons}>
            {/* Loop buttons */}
            <div className={styles.loop_buttons}>
              <LoopButton
                title="Loop one"
                callback={() => {
                  setToLoopOne(!toLoopOne);
                }}
                imgSrc={LoopIcon}
                size="small"
                isActive={toLoopOne}
              />
              {playList[0] !== "" && (
                <LoopButton
                  title="Loop folder"
                  callback={() => {}}
                  imgSrc={AllInclusiveIcon}
                  size="small"
                />
              )}
            </div>
            {/* Control buttons */}
            <div className={styles.control_buttons}>
              <ControlButton
                title=""
                icon={Replay5Icon}
                callback={() => {
                  skipPastFive(false);
                }}
                size="large"
                style={{ margin: "0px 10px" }}
              />
              {playList[0] !== "" && (
                <ControlButton
                  title=""
                  icon={SkipPreviousIcon}
                  callback={() => {}}
                  size="large"
                />
              )}
              <ControlButton
                title=""
                icon={
                  isLoaded
                    ? isPlaying
                      ? PauseCircleIcon
                      : PlayCircleIcon
                    : HourglassTopIcon
                }
                callback={() => {
                  isPlaying ? handleAudioPause() : handleAudioPlay();
                }}
                size="large"
              />
              {playList[0] !== "" && (
                <ControlButton
                  title=""
                  icon={SkipNextIcon}
                  callback={() => {}}
                  size="large"
                />
              )}
              <ControlButton
                title=""
                icon={Forward5Icon}
                callback={() => {
                  skipPastFive(true);
                }}
                size="large"
                style={{ margin: "0px 10px" }}
              />
            </div>
            {/* Volume control */}
            <div className={styles.volume_control}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <VolumeDown sx={{ color: "#0663e5" }} />
                <Slider
                  aria-label="Volume"
                  value={audioVolume}
                  onChange={handleAudioVolumeChange}
                  size="small"
                  step={1}
                  min={0}
                  max={100}
                  sx={{
                    width: "100px",
                  }}
                />
                <VolumeUp sx={{ color: "#0663e5" }} />
              </Stack>
            </div>
          </div>
          {/* Seeker */}
          <div className={styles.seeker}>
            <h3>{returnSecondsToTimeString(playerCount)}</h3>
            <Slider
              aria-label="Volume"
              value={timerValue}
              onChange={handleTimerChange}
              size="small"
              onChangeCommitted={() => {
                setIsSeeking(false);
              }}
            />
            <h3>{returnSecondsToTimeString(audioFullDuration)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

type loopButtonProps = {
  title: string;
  callback: () => void;
  imgSrc: React.ComponentType<SvgIconProps>;
  size: "small" | "medium" | "inherit" | "large";
  isActive?: boolean;
};

const LoopButton = ({
  title,
  imgSrc: Icon,
  callback,
  size,
  isActive = false,
}: loopButtonProps) => {
  return (
    <Tooltip title={`${title}: ${isActive ? "On" : "Off"}`} placement="top">
      <div
        className={styles.loop_button}
        style={{
          background: isActive ? "#f44336" : "#0663e5",
        }}
        onClick={callback}
      >
        <Icon
          sx={{
            color: "#fff",
            cursor: "pointer",
          }}
          fontSize={size}
        />
      </div>
    </Tooltip>
  );
};

type controlButtonProps = {
  title: string;
  size: "small" | "medium" | "inherit" | "large";
  icon: React.ComponentType<SvgIconProps>;
  callback: () => void;
  style?: object;
};

const ControlButton = ({
  title,
  size,
  icon: Icon,
  callback,
  style = {},
}: controlButtonProps) => {
  return (
    <Tooltip title={title} placement="top">
      <Icon
        sx={{
          color: "#f44336",
          cursor: "pointer",
          ...style,
        }}
        onClick={callback}
        fontSize={size}
      />
    </Tooltip>
  );
};

export default FilePlayer;
