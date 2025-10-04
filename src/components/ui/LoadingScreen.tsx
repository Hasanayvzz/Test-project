import { Loader2 } from "lucide-react";
import React from "react";
interface ILoadingScreen {
  text: string;
}
const LoadingScreen = ({ text }: ILoadingScreen) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-text animate-spin mb-4" />
      <p className="text-copy-secondary">{text}</p>
    </div>
  );
};

export default LoadingScreen;
