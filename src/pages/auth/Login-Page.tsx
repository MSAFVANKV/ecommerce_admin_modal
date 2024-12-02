import AyButton from "@/components/myUi/AyButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@ayb.com");
  const [password, setPassword] = useState("123");

  const login = (e: React.FormEvent) => {

    e.preventDefault();

    // Example authentication logic
    if (email === "admin@ayb.com" && password === "123") {
      Cookie.set(
        "us_b2b_admin", // Cookie name
        JSON.stringify({ username: email }), // Cookie value
        { expires: 1, sameSite: "strict" } // Cookie expires in 1 day
      );
      navigate("/dashboard")
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div
      className="h-screen w-full flex select-none"
      style={{
        backgroundImage: 'url("/img/bg/bg-admin04.jpg")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative m-auto w-[320px] bg-white/60 backdrop-filter overflow-hidden shadow-xl backdrop-blur-lg rounded-xl h-[40%] p-5 flex flex-col justify-between">
        <div className="absolute w-96 h-96 bg-[#5f08b1]/15 blur-md shadow-[#5f08b1]/20 shadow-lg -z-50 rounded-full -top-[160px] -right-[160px]" />

        <div className="flex items-center justify-between w-full">
          <img src="/img/logo/Logo_black.svg" alt="Admin Logo" width={100} />
          <p>Admin</p>
        </div>
        <form onSubmit={login}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-5"
            placeholder="Email"
            required
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=""
              placeholder="Password"
              required
            />
            <Icon
              onClick={() => setShowPassword(!showPassword)}
              icon={
                !showPassword
                  ? "fluent:eye-off-16-regular"
                  : "fluent:eye-24-regular"
              }
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
            />
          </div>

          <AyButton
            title="LOGIN"
            type="submit" // Ensures the button submits the form
            sx={{
              mt: "3rem",
              width: "100%",
            }}
          />
        </form>
      </div>
    </div>
  );
}
