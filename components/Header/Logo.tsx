import styles from './Logo.module.css';

const Logo = () => (
  <a href="/" className="flex items-center">
    <img className="h-10 p-1" src="/assets/logo.png" />
    <div className="text-xl">cubetimer.io</div>
  </a>
);

export default Logo;