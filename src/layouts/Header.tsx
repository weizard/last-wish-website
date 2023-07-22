import logo from './logo.svg';
import { paths } from './constant';

export function Header() {
  return (
    <header className="w-full pb-5 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
      <nav className="bg-transparent border-gray-200 pt-5 ">
        <div className="flex flex-wrap space-x-8 items-center px-4 mx-auto">
          <a href="#" className="flex items-center">
            {/* <img src="./images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" /> */}
            <span className="self-center text-3xl font-semibold whitespace-nowrap">LastWish</span>
          </a>
          <div className="justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {paths.map(({ tab, path }, i) => (
                <li key={`path-${i}`}>
                  <a
                    href={path}
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-slate-500 lg:p-0"
                  >
                    {tab}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
