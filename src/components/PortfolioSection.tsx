
const PROJECTS = [
  {
    icon: "/icon/设备.png",
    name: "多传感器监测分析终端",
    desc: "触摸屏设备监控与数据分析终端设备",
    tags: ["Serial", "RS485", "lvgl"],
    url: "/projects/handeld/touchscreen_serial_monitor.html",
  },
  {
    icon: "/icon/上位机.png",
    name: "Modbus 多模型上位机",
    desc: "Modbus 协议多模型交互与监控上位机",
    tags: ["Modbus", "RS485", "pyQt6"],
    url: "/projects/modbs-upper-machine/page-interaction-review-prototype.html",
  },
];

export default function PortfolioSection() {
  return (
    <div className="w-full max-w-md">
      {/* Title Area */}
      <div className="mb-5">
        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.15em]">
          Vibe Coding
        </p>
        <h3 className="text-base font-semibold text-foreground mt-0.5">
          作品展示
        </h3>
      </div>

      {/* Cards — side by side */}
      <div className="flex flex-col sm:flex-row gap-3">
        {PROJECTS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center text-center gap-2 rounded-xl border border-border/60 bg-card hover:bg-accent/30 hover:border-border hover:shadow-sm px-3 py-3.5 transition-all duration-200 group cursor-pointer -translate-y-0 hover:-translate-y-0.5"
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
              <img
                src={p.icon}
                alt=""
                className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground leading-tight">
                {p.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {p.desc}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap justify-center gap-1 mt-auto">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-muted-foreground/60 bg-muted/60 px-1.5 py-px rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
