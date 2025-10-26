import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthContext from "@/contexts/AuthContext";
import { getLocalStorage } from "@/services/localStorageService";
import { ChevronDown, LockIcon, User2 } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const userData = getLocalStorage("userData");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white outline-none text-start">
        <div className="flex items-center gap-3 text-sm">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/binamarga/profile-picture.png"
              alt="user photo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <h2 className="capitalize">{userData?.fullname}</h2>
            <p className="text-xs capitalize font-normal">{userData?.role}</p>
          </div>
          <div>
            <ChevronDown size={18} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigate("/profile");
          }}
          className="cursor-pointer"
        >
          <User2 className="mr-2" size={16} /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate("/change-password");
          }}
          className="cursor-pointer"
        >
          <LockIcon className="mr-2" size={16} /> Ubah Kata Sandi
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={logout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
