// components/withProtectedRoute.tsx
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/lib/context/UserContext"; // Adjust the path as needed

const withProtectedRoute = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const user = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;
