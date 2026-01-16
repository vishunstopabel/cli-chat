import chalkAnimation from "chalk-animation";
import figlet from "figlet";

export const showBanner = () => {
  chalkAnimation.karaoke(
    figlet.textSync("ShellChat", {
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  );
};
