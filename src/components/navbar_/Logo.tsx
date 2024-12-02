import { Icon } from '@iconify/react/dist/iconify.js'
import { Link } from 'react-router-dom'

type Props = {
    link?: string
}

export default function Logo({link="/dashboard"}: Props) {
  return (
    <Link className="flex gap-2 group items-center select-none" to={`${link}`}>
    <div className="h-10 relative w-10  rounded-2xl bg-textMain flex items-center justify-center overflow-hidden">
      {/* Image slides to the left */}
      <img
        src="/img/logo/flower_ayaboo.png"
        alt="navbar logo"
        className="absolute w-[50%]  group-hover:w-0 group-hover:translate-x-[-150%] transition-all duration-300 ease-in"
      />

      {/* Icon slides in from the right */}
      <Icon
        icon="fluent:home-28-filled"
        fontSize={20}
        color="#ffff"
        className="absolute translate-x-[150%] group-hover:translate-x-0 transition-all duration-500 ease-in-out"
      />
    </div>
    <h4 className="font-bold">Ayaboo</h4>
  </Link>
  )
}