const TerminalOverlay = () => {
  return (
    <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4 border border-white/20 shadow-soft backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-destructive"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-muted-foreground ml-2 font-mono">terminal</div>
      </div>

      <div className="font-mono text-xs text-primary">
        <div className="flex">
          <span className="text-muted-foreground mr-2">$</span>
          <span className="animate-pulse">Анализ данных пользователя...</span>
        </div>
        <div className="flex mt-1">
          <span className="text-muted-foreground mr-2">$</span>
          <span>Генерация персонализированного плана</span>
        </div>
        <div className="flex mt-1">
          <span className="text-muted-foreground mr-2">&gt;</span>
          <span className="text-green-500">Готово! Начните свой путь к идеальной форме</span>
        </div>
      </div>
    </div>
  )
}

export default TerminalOverlay
