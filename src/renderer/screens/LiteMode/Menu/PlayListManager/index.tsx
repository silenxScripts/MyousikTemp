import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { GET_ALL_LITE_AUDIO_FILES, GET_LITE_PLAYLIST } from "ipcEvents";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

type playlists = [
  {
    name: string;
    items: Array<string>;
  }
];

const PlayListManager = ({ setIsExplorerVis }) => {
  const [playlists, setPlayLists] = useState<playlists>();
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>();
  const [items, setItems] = useState<Array<string>>();
  const [allAvailableAudios, setAllAvailableAudios] = useState<Array<string>>();
  const [selectedAudio, setSelectedAudio] = useState<string>();

  useEffect(() => {
    const playListRefresh = setInterval(() => {
      window.electron.ipcRenderer.sendMessage(GET_LITE_PLAYLIST);
      window.electron.ipcRenderer.sendMessage(GET_ALL_LITE_AUDIO_FILES);
    }, 100);
    window.electron.ipcRenderer.on(GET_LITE_PLAYLIST, (args) => {
      setPlayLists(args);
    });
    window.electron.ipcRenderer.on(GET_ALL_LITE_AUDIO_FILES, (args) => {
      setAllAvailableAudios(args);
    });
    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_LITE_PLAYLIST);
      window.electron.ipcRenderer.removeAllListeners(GET_ALL_LITE_AUDIO_FILES);
      clearInterval(playListRefresh);
    };
  });

  useEffect(() => {
    if (selectedPlaylist === "All") {
      setItems(allAvailableAudios);
      return;
    }
    let lis: Array<string>;
    playlists?.forEach((playList) => {
      if (playList.name === selectedPlaylist) {
        lis = playList.items;
        setItems(lis);
      }
    });
  }, [selectedPlaylist, playlists]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>
        <LibraryMusicIcon
          sx={{
            color: "#f44336",
          }}
        />
        <hr />
        Your playlists
      </h1>
      <div className={styles.playlists_viewer}>
        <div className={styles.playlists}>
          {playlists
            ? playlists.map((playlist, index) => (
                <li
                  onClick={() => {
                    setSelectedPlaylist(playlist.name);
                  }}
                  key={index}
                >
                  <AudioFileIcon
                    sx={{
                      color: "#f44336",
                      marginRight: "10px",
                    }}
                  />
                  <span />
                  {playlist.name.slice(0, 25)}
                  {playlist.name.length >= 25 ? ".." : ""}
                </li>
              ))
            : null}
        </div>
        <div className={styles.items}>
          {items
            ? items.map((item, index) => {
                const titleSplitList = item.split("\\");
                const title = titleSplitList[titleSplitList.length - 1];
                return (
                  <li
                    onClick={() => {
                      setIsExplorerVis(false);
                    }}
                    key={index}
                  >
                    <span />
                    <MusicNoteIcon
                      sx={{
                        color: "#f44336",
                        marginRight: "10px",
                      }}
                    />
                    {title.replace(".mp3", "")}
                  </li>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default PlayListManager;
