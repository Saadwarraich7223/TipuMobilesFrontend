import { Zap } from "lucide-react";
import useCountdown from "../../../hooks/useCountDown";

const CountdownTimer = ({ endTime }) => {
  const { hours, minutes, seconds } = useCountdown(endTime);

  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
      <Zap size={18} className="text-red-500" />
      <span className="text-gray-600 text-sm sm:text-base font-medium">
        Ends in
      </span>

      <div className="flex gap-1 sm:gap-2 text-base sm:text-lg font-semibold text-gray-900">
        <span className="bg-white border px-2 sm:px-3 py-1 rounded min-w-[2.5rem] text-center">
          {hours.toString().padStart(2, "0")}
        </span>
        :
        <span className="bg-white border px-2 sm:px-3 py-1 rounded min-w-[2.5rem] text-center">
          {minutes.toString().padStart(2, "0")}
        </span>
        :
        <span className="bg-white border px-2 sm:px-3 py-1 rounded min-w-[2.5rem] text-center">
          {seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
