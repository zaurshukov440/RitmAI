import { UserResource } from "@clerk/types";
import CornerElements from "./CornerElements";

const ProfileHeader = ({ user }: { user: UserResource | null | undefined }) => {
  if (!user) return null;
  return (
    <div className="mb-10 relative glass rounded-2xl border border-border p-6 shadow-soft">
      <CornerElements />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative">
          {user.imageUrl ? (
            <div className="relative w-24 h-24 overflow-hidden rounded-2xl border border-border shadow-soft hover-lift transition-all duration-300">
              <img
                src={user.imageUrl}
                alt={user.fullName || "Профиль"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border border-border shadow-soft hover-lift transition-all duration-300">
              <span className="text-3xl font-bold text-primary font-display">
                {user.fullName?.charAt(0) || "П"}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-background animate-pulse"></div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight font-display">
              <span className="text-foreground">{user.fullName}</span>
            </h1>
            <div className="flex items-center glass rounded-full px-3 py-1 border border-border shadow-soft">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></div>
              <p className="text-xs text-primary">ПОЛЬЗОВАТЕЛЬ АКТИВЕН</p>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 my-2"></div>
          <p className="text-muted-foreground font-body">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
