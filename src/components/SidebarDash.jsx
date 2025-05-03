import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdDisplaySettings, MdMiscellaneousServices } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/slices/authslice";
export default function SidebarDash() {
  const dispatch = useDispatch();
  const links = [
    { href: '/', name: 'Dashboard', icon: HiOutlineSquares2X2 },
    { href: '/appointments', name: 'Appointments', icon: IoCalendarOutline },
    { href: '/messages', name: 'Messages', icon: BiMessageSquareDots },
    { href: '/account-setting', name: 'Account Setting', icon: MdDisplaySettings },
    { href: '/clients-profile', name: 'Clients Profile', icon: MdDisplaySettings },
    { href: '/employees', name: 'Employees', icon: HiOutlineSquares2X2 },
    { href: '/services', name: 'Services', icon: MdMiscellaneousServices },
    { href: '/marketing', name: 'Marketing', icon: FaRegStar },
    { href: '/refer-friend', name: 'Refer a Friend', icon: MdDisplaySettings },
  ];
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };
  return (
    <div className="sidebar sidebar2">
      <div className="logo">
        <Image src={"/images/logo.png"} alt="Profile" width={353} height={190} />
      </div>
      <div className="side_menu2">
        <ul>
          {links.map((link, i) => (
            <li key={i}>
              <span>{link.icon && <link.icon />}</span>
              <Link href={`/dashboard${link.href}`} prefetch={true}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="side_menu2 sm2-end mb-5">
        <ul className='pt-0 m-0'>
          <li className='pt-0 m-0'>
            <span><RiLogoutBoxLine /></span>
            <Link href="/auth/signin" onClick={handleLogout} >Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
{/* <li>
            <span><IoCalendarOutline /></span>
            <Link href="/dashboard/appointments">Appointments</Link>
          </li>
          <li>
            <span><BiMessageSquareDots /></span>
            <Link href="/dashboard/messages">Messages</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/account-setting">Account Settings</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/clients-profile">Clients Profiles</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/employees">Employees</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/services">Services</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/marketing">Marketing</Link>
          </li>
          <li>
            <span><MdDisplaySettings /></span>
            <Link href="/dashboard/refer-friend">Refer a Friend</Link>
          </li> */}