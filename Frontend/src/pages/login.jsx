import axios from "../Axios/Axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/feature/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsloading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsloading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  useEffect(()=>{
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Signup successful")
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Login successful");
      navigate('/')
      }
      if(registerError){
        toast.error(registerError.data.message || "Login Failed")
        }
        if(loginError){
         
          toast.error(loginError.data.message || "Login Failed")
          }

      },[registerIsSuccess,loginIsSuccess,registerData,loginData,loginError,registerError])
  

  const inputHandler = (e, type) => {
    if (type === "signup") {
      setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
    } else if (type === "login") {
      setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    }
  };

  const formHandler = async (type) => {
    try {
      if (type === "signup") {
       await registerUser(signupInput);
       console.log(signupInput)
       console.log('signup done ')
        setSignupInput({
          name: "",
          email: "",
          password: "",
        });
      } else if (type === "login") {
       await loginUser(loginInput)
        setLoginInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error:",error);
    }
  };

  return (
    <div className="flex items-center mt-10 w-full justify-center">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => inputHandler(e, "signup")}
                  placeholder="Name here."
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={signupInput.email}
                  onChange={(e) => inputHandler(e, "signup")}
                  placeholder="Email here."
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => inputHandler(e, "signup")}
                  placeholder="Password"
                  type="password"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disable={registerIsloading.toString()} onClick={() => formHandler("signup")}>
              {
                  registerIsloading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                    </>
                  ) : "Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your account here. After signup you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => inputHandler(e, "login")}
                  placeholder="Eg. abc@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => inputHandler(e, "login")}
                  placeholder="Eg. abc"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disable={loginIsloading.toString()} onClick={() => formHandler("login")}>
                {
                  loginIsloading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                    </>
                  ) : "Login"
                }
                
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
