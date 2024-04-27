import { Button } from "@repo/ui/button";

export default function Page(): JSX.Element {
  return (
    <div className="text-2xl">
      hi there
      <Button appName="user-app" className="font-bold">
        Hello
      </Button>
    </div>
  );
}
