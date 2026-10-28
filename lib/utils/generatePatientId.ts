import Counter from "@/models/Counter";

export async function generatePatientId() {
  const counter = await Counter.findOneAndUpdate(
    { name: "patient" },
    { $inc: { sequence: 1 } },
    {
      upsert: true, //automatically create the document if it doesn't exist
      returnDocument: "after",
    },
  );

  if (!counter) {
    throw new Error("Unable to generate patient sequence");
  }

  const unid = `CSP${String(counter.sequence).padStart(6, "0")}`;

  //CALLING CHARAK API FOR PATIENT ID

  const response = await fetch("https://charakdt.com/api/single-register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      organization: "aiimsbhopal",
      UNID: unid,
    }),
  });

  const data = await response.json();

  if (![200, 201, 409].includes(response.status)) {
    throw new Error(data.error || "Unable to generate Patient ID");
  }

  const patientId = data?.data?.charakId;

  if (!patientId) {
    throw new Error("CharakID missing in API response");
  }

  return patientId;
}

//OLD PATIENT ID CODE GENRATOR

// function generateRandomLetters(length: number) {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//   let result = "";

//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }

//   return result;
// }

// export async function generatePatientId() {
//   const counter = await Counter.findOneAndUpdate(
//     {
//       name: "patient",
//     },
//     {
//       $inc: {
//         sequence: 1,
//       },
//     },
//     {
//       upsert: true,
//       returnDocument: "after",
//     },
//   );

//   const randomLetters = generateRandomLetters(4);

//   const sequence = String(counter.sequence).padStart(4, "0");

//   return `CHRK${randomLetters}${sequence}`;
// }
