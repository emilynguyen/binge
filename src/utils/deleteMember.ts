import { readData, writeData } from "@/utils/firebaseUtils";

export async function deleteMember(partyID, sessionID) {
  // Get current members
  const membersData = await readData(`${partyID}/members`);
  const members = membersData ? Object.values(membersData) : [];

  if (members.length > 0) {
    // Filter out the member to delete
    const updatedMembers = members.filter((member) => member.id !== sessionID);

    // Update the database
    await writeData(`${partyID}/members`, updatedMembers);
    console.log("Member deleted successfully");
  } else {
    throw new Error("Party not found or no members to delete");
  }
}

export default deleteMember;