import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import AddDocumentBtn from "@/components/AddDocumentBtn";


const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const roomDocuments = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <button className="">NotiIcon</button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {roomDocuments.data.length > 0 ? (
        <div>
          <p>data</p>{" "}
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />

          <AddDocumentBtn userId = {clerkUser.id} email = {clerkUser.emailAddresses[0].emailAddress}  />
        </div>
      )}
    </main>
  );
};

export default Home;
