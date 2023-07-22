import { paths } from './constant';

export function Footer() {
  return (
    <footer className="lg:hidden text-center grid grid-cols-2 gap-4">
      {paths.map(({ tab, path }, i) => (
        <a key={`path-${i}`} href={path} className="block py-2 pl-3 pr-4 text-gray-700">
          {tab}
        </a>
      ))}
    </footer>
  );
}
