import { LogoIcon } from "@/components/icons/PixelIcons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center gap-3">
        <LogoIcon size={28} />
        <div className="flex flex-col leading-none">
          <span className="text-[18px] font-bold text-ink tracking-tight">Voyagé</span>
        </div>
      </div>
    </header>
  );
}
