import s from './Sidebar.module.css';

type Props = {
  appName: string;
  appDescription: string;
};

function SideBar({ appName, appDescription }: Props) {
  return (
    <div className={s.sidebarBlock}>
      <div className={s.aside}>
        <h2 className={s.appName}>{appName}</h2>
        <p className={s.appDescription}>{appDescription}</p>
      </div>
    </div>
  );
}

export default SideBar;
