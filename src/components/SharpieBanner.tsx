const SharpieBanner = () => {
  return (
    <div
      className="w-full bg-[#FFFF00] text-foreground text-center py-2 px-4 font-bold text-sm border-b-2 border-foreground animate-wobble-slow"
      style={{ transform: "rotate(-0.3deg)" }}
    >
      This prototype intentionally looks crappy — it's all about getting the idea across. (using{" "}
      <a
        href="http://www.sharpiemocks.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary"
      >
        sharpiemocks.com
      </a>
      )
    </div>
  );
};

export default SharpieBanner;
