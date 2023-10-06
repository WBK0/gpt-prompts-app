const Footer = () => {
  return (
    <div className="bg-gray-200 dark:bg-stone-950">
      <div className="container mx-auto">
        <div className="h-40 flex items-center flex-col justify-center">
          <h3 className="text-2xl font-bold text-zinc-800 dark:text-gray-100">
            GPT PROMPTS APP
          </h3>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Made with ❤️ by <a href="https://github.com/wbk0" target="_blank">Bartłomiej Ostojski</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer;