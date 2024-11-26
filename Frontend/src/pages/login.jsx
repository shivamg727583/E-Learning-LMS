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
import { useState } from "react";

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
        const response = await axios.post("/v1/user/register", signupInput);
        console.log("Signup Response:", response.data);
        setSignupInput({
          name: "",
          email: "",
          password: "",
        });
      } else if (type === "login") {
        const response = await axios.post("/v1/user/login", loginInput);
        console.log("Login Response:", response.data);
        setLoginInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center w-full justify-center">
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
              <Button onClick={() => formHandler("signup")}>Signup</Button>
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
              <Button onClick={() => formHandler("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
