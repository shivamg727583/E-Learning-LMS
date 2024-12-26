
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
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsloading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsloading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  console.log(loginData)

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful");
      navigate('/');
    }
  }, [registerIsSuccess, loginIsSuccess, registerData, loginData, navigate]);

  useEffect(() => {
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [registerError, loginError]);

  const inputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else if (type === "login") {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formHandler = async (type) => {
    try {
      if (type === "signup") {
        await registerUser(signupInput);
        setSignupInput({ name: "", email: "", password: "" });
      } else if (type === "login") {
        await loginUser(loginInput);
        setLoginInput({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
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
              <CardDescription>Create a new account and click signup when you are done.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input name="name" value={signupInput.name} onChange={(e) => inputHandler(e, "signup")} placeholder="Name here." required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" value={signupInput.email} onChange={(e) => inputHandler(e, "signup")} placeholder="Email here." required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" value={signupInput.password} onChange={(e) => inputHandler(e, "signup")} placeholder="Password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsloading} onClick={() => formHandler("signup")}>
                {registerIsloading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</> : "Signup"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your account here. After signup you'll be logged in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" value={loginInput.email} onChange={(e) => inputHandler(e, "login")} placeholder="Eg. abc@gmail.com" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" value={loginInput.password} onChange={(e) => inputHandler(e, "login")} placeholder="Eg. abc" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsloading} onClick={() => formHandler("login")}>
                {loginIsloading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</> : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;



