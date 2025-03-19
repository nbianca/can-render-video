import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";
import { iconHTML } from "discourse-common/lib/icon-library";

function showVideoNotice(video, videoContainer) {
  if (video.videoWidth > 0 || video.videoHeight > 0) {
    return;
  }

  const notice = document.createElement("div");
  notice.className = "notice";
  notice.innerHTML =
    iconHTML("triangle-exclamation") +
    " " +
    I18n.t(themePrefix("video.cannot_render"));
  videoContainer.appendChild(notice);
}

export default {
  name: "cannot-render",

  initialize() {
    withPluginApi("0.11.2", (api) => {
      api.decorateCookedElement(
        (element) => {
          const containers = element.getElementsByClassName("video-container");
          for (let i = 0; i < containers.length; ++i) {
            const video = containers[i].getElementsByTagName("video")[0];
            video.addEventListener("loadeddata", () => {
              setTimeout(() => showVideoNotice(video, containers[i]), 500);
            });
          }
        },
        { id: "cannot-render" }
      );
    });
  },
};
