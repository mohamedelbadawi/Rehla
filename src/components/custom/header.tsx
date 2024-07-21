import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "../ui/use-toast";
import {
  getAuthUserData,
  getUserInfoFromGoogle,
  isAuth,
} from "@/create-trip/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User } from "@/types/user";
import { Link } from "react-router-dom";


const Header = () => {
  const [user, setUser] = useState<User>({});
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      toast({ variant: "default", description: "Login Successfully ✅" });
      getUserInfoFromGoogle(credentialResponse);
      setTimeout(() => {
        window.location.reload();
      },2000);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  useEffect(() => {
    if (isAuth()) {
      setUser(getAuthUserData());
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between px-5 py-3 shadow-md">
      <Link to="/">
        <img src="/logo.svg" />
      </Link>
      {!isAuth() ? (
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>Sign In</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="flex flex-col items-center">
                  <img src="/logo.svg" alt="" className="w-1/2" />
                  <h3 className="mt-4 text-3xl font-bold text-start">
                    Sign in with Google
                  </h3>
                  <span className="mt-2 text-sm text-gray-500">
                    Sign in with your google account
                  </span>
                  <Button
                    className="w-full mt-5"
                    onClick={() => {
                      login();
                    }}
                  >
                    {" "}
                    <FcGoogle className="me-2 text-lg" /> Sign In with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Avatar className="w-10">
            <AvatarImage className="rounded-full" src={user.picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link to={'/mytrips'}>
          <h4 className="font-bold">{user.name?.toUpperCase()}</h4>
          </Link>
          <Button
            className="text-sm"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
