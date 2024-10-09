
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import { Input } from "@/components/ui/input"
const formSchema = z.object({"username":z.string().min(1).max(255),"password":z.string().min(5).max(9999)})

function Login() {
   const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            },
    })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className = "flex min-h-screen ">
        {/* left side */}
        <div className = "w-1/2 bg-gray-900">
            <div> logo </div>
            <h1>left side</h1>
        </div>

        {/* right side */}
        <div className="w-1/2 bg-white flex flex-col">
        {/* Register button aligned to the right */}
          <div className="w-full flex justify-end p-4">
            <Button variant="outline">Home</Button>
          </div>

          {/* login form centered */}
          <div className="w-full flex justify-center items-center flex-grow ">
            <div className="w-3/4 flex flex-col">
              <Form {...form}>
                <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Login</Button>
                </form>

                <Button type="submit">Login with your UCI account!</Button>

              </Form>
            </div>
          </div>

      </div>
    </div>
  )




}

export default Login;   




/* 




        





*/