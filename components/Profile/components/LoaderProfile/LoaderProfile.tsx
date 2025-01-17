import { ReactNode } from "react";
import ContentLoader from "react-content-loader";

interface LoaderProfileProp {
  children: ReactNode;
  isLoading: boolean;
}

const LoaderProfile = ({ children, isLoading }: LoaderProfileProp) => {
  if (isLoading) {
    return (
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="100" y="10" rx="3" ry="3" width="400" height="15" />
        <rect x="100" y="35" rx="3" ry="3" width="400" height="15" />

        <circle cx="60" cy="30" r="20" />
      </ContentLoader>
    );
  }
  return children;
};

export default LoaderProfile;
