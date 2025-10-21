import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 md:w-50 lg:w-100 border-r border-slate-600 flex flex-col transition-all duration-200">
      <div className="w-full flex flex-col p-1 md:p-4 items-start justify-center border-b border-slate-600">
        <div className="text-xl md:text-2xl font-semibold flex gap-1 md:gap-2 items-center">
          <Users className="w-6 h-6" />
          <p className="hidden md:inline">Community</p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label className="flex flex-col md:flex-row md:items-center gap-2">
            <input
              type="checkbox"
              id="yellow-checkbox"
              disabled
              readOnly
              className="appearance-none w-4 h-4 md:w-5 md:h-5 border-2 checked:p-1 border-gray-400 rounded-full checked:bg-green-500 checked:border-gray-900 checked:border-5 transition duration-200 cursor-not-allowed"
            />
            <span className="text-xs md:text-sm">Show online users</span>
          </label>
          <span className="text-xs md:text-sm text-zinc-500">(0 online)</span>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {skeletonContacts.map((_, idx) => {
          return (
            <div
              className={`px-2 sm:px-4 py-6 flex items-center gap-2 border-gray-700`}
            >
              <div className="flex relative">
                <div className="relative mx-auto lg:mx-0">
                  <div className="skeleton size-14 rounded-full bg-gray-950 animate-pulse" />
                </div>
              </div>
              <div className="hidden md:flex flex-col justify-center">
                <div className="skeleton h-4 w-32 mb-2 bg-gray-950 animate-pulse" />
                <div className="skeleton h-3 w-16 bg-gray-950 animate-pulse" />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
