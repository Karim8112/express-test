# MongoDB Shell (`mongosh`) Script: Reset & Re-seed Projects with `ProjectType` ObjectIds

This document provides step-by-step instructions and the exact MongoDB Shell (`mongosh`) script to:

1. Clear all existing data from the `projects` collection (`db.projects.deleteMany({})`).
2. Ensure the `projecttypes` collection contains all required type documents (including `Supplement`).
3. Re-insert all 55 project documents with their **`projectType` field mapped to valid `ObjectId` references**, resolving the Mongoose `CastError` during `.populate('projectType')`.

---

## 📋 Step-by-Step Instructions

1. Open your terminal and connect to your MongoDB instance using `mongosh`:
   ```bash
   mongosh "mongodb+srv://<username>:<password>@cluster0.mongodb.net/your_database_name"
   ```
2. Switch to your application database:
   ```javascript
   use your_database_name;
   ```
3. Copy and execute the script below in `mongosh`.

---

## 🛠️ Complete `mongosh` Re-seed Script

```javascript
// 1. Ensure 'Supplement' exists in the projecttypes collection
db.projecttypes.updateOne(
  { _id: ObjectId("6addfd70ac1be6ccd8491740") },
  { $setOnInsert: { name: "Supplement", __v: 0 } },
  { upsert: true },
);

// 2. Clear all existing documents from the projects collection
db.projects.deleteMany({});

// 3. Insert all projects with projectType as ObjectId references
db.projects.insertMany([
  {
    _id: ObjectId("6ac9cb9a462f74169b04a884"),
    name: "al Zerbia Furniture",
    donor: "UNHCR",
    value: "",
    startDate: "2023-12-20T00:00:00.000Z",
    endDate: "2024-01-15T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a885"),
    name: "Dar Hamaad Restoration",
    donor: "French-Arabic Inst.",
    value: "",
    startDate: "2023-01-01T00:00:00.000Z",
    endDate: "2024-12-31T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6addfd81ac1be6ccd8491742"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a886"),
    name: "Al-Fadl Canal",
    donor: "ICRC",
    value: "",
    startDate: "2023-01-01T00:00:00.000Z",
    endDate: "2023-12-31T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a887"),
    name: "Water Authority Bldg",
    donor: "ICRC",
    value: "",
    startDate: "2023-01-01T00:00:00.000Z",
    endDate: "2023-12-31T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a888"),
    name: "al Razi Hospital",
    donor: "UNHCR",
    value: "",
    startDate: "2023-09-07T00:00:00.000Z",
    endDate: "2023-10-25T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a889"),
    name: "al Razi Hospital",
    donor: "ICRC",
    value: "",
    startDate: "2023-07-22T00:00:00.000Z",
    endDate: "2023-11-08T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a88a"),
    name: "Abdullah Kousa School",
    donor: "ICRC",
    value: "",
    startDate: "2021-12-04T00:00:00.000Z",
    endDate: "2022-03-01T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6addfd81ac1be6ccd8491742"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a88b"),
    name: "Salah Al-Din Sewage",
    donor: "ICRC",
    value: "",
    startDate: "2022-02-06T00:00:00.000Z",
    endDate: "2022-03-30T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6addfd8aac1be6ccd8491743"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a88c"),
    name: "7 Schools Restoration",
    donor: "UNICEF",
    value: "",
    startDate: "2022-02-21T00:00:00.000Z",
    endDate: "2022-07-30T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a88d"),
    name: "Furniture Supply",
    donor: "ICRC",
    value: "",
    startDate: "2022-07-18T00:00:00.000Z",
    endDate: "2022-08-08T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a88e"),
    name: "Sewage Cover Supply",
    donor: "ICRC",
    value: "",
    startDate: "2022-08-22T00:00:00.000Z",
    endDate: "2022-09-29T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6addfd8aac1be6ccd8491743"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a88f"),
    name: "Youth Housing Courtyard",
    donor: "ICRC",
    value: "",
    startDate: "2022-11-22T00:00:00.000Z",
    endDate: "2023-03-20T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a890"),
    name: "School Desks Supply",
    donor: "UNHCR",
    value: "",
    startDate: "2022-08-21T00:00:00.000Z",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a891"),
    name: "12 Schools Restoration",
    donor: "UNICEF",
    value: "",
    startDate: "2022-08-03T00:00:00.000Z",
    endDate: "2023-02-02T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a892"),
    name: "Rainwater Drain 2022",
    donor: "ICRC",
    value: "",
    startDate: "2022-10-26T00:00:00.000Z",
    endDate: "2022-12-15T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6addfd8aac1be6ccd8491743"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a893"),
    name: "Furniture Supply",
    donor: "ICRC",
    value: "",
    startDate: "2022-11-15T00:00:00.000Z",
    endDate: "2022-12-01T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a894"),
    name: "3 Schools Restoration",
    donor: "UNDP",
    value: "",
    startDate: "2022-12-10T00:00:00.000Z",
    endDate: "2023-04-23T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a895"),
    name: "Rescue Equipment",
    donor: "ICRC",
    value: "",
    startDate: "2023-03-13T00:00:00.000Z",
    endDate: "2023-07-20T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a896"),
    name: "Rainwater Drain 2023",
    donor: "ICRC",
    value: "",
    startDate: "2023-11-07T00:00:00.000Z",
    endDate: "2023-08-20T00:00:00.000Z",
    images: [],
    projectType: ObjectId("6addfd8aac1be6ccd8491743"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a897"),
    name: "Qadi Askar Bakery",
    donor: "UNDP",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a898"),
    name: "Al-Wahda Bakery",
    donor: "UNDP",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a899"),
    name: "Hussein Al-Ghouri School",
    donor: "UN",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a89a"),
    name: "Abdul Karim Najjar School",
    donor: "UN",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a89b"),
    name: "Hussein Ibrahim School",
    donor: "UN",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a89c"),
    name: "Ramzi Al-Lulu School",
    donor: "UN",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a89d"),
    name: "Thermal Station School",
    donor: "UN",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a89e"),
    name: "Umm Al-Amd School",
    donor: "UN",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a89f"),
    name: "Marwan Bin Al-Hakam School",
    donor: "UNDP",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a0"),
    name: "Asmaa Bint Abi Bakr School",
    donor: "UNDP",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a1"),
    name: "Ibn Khaldun Mental Health Hospital",
    donor: "Red Cross/Crescent",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a2"),
    name: "Sheikh Maqsood Sewage Project",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd8aac1be6ccd8491743"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a3"),
    name: "Sewage Contract",
    donor: "UNDP",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd8aac1be6ccd8491743"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a4"),
    name: "Water Contract",
    donor: "UNDP",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd9cac1be6ccd8491745"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a5"),
    name: "Idlib Schools Contract",
    donor: "UN",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd95ac1be6ccd8491744"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a6"),
    name: "Salah Al-Din Sewage Contract",
    donor: "UN-Habitat",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd8aac1be6ccd8491743"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a7"),
    name: "Municipal Palace Office Renovation",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a8"),
    name: "City Waste Container Supply",
    donor: "UN-Habitat",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfda3ac1be6ccd8491746"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8a9"),
    name: "Akhtarin Camp Rehab & Solar Power",
    donor: "UN",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfdacac1be6ccd8491747"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8aa"),
    name: "Al-Razi Bakery",
    donor: "Red Cross/Crescent",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8ab"),
    name: "Al-Razi Hospital",
    donor: "Red Cross/Crescent",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8ac"),
    name: "Arbin & Douma Furniture Supply",
    donor: "UN-Habitat",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfda3ac1be6ccd8491746"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8ad"),
    name: "UNRWA Furniture Supply",
    donor: "UNRWA",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfda3ac1be6ccd8491746"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8ae"),
    name: "Water Culverts",
    donor: "Red Cross/Crescent",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfdb3ac1be6ccd8491748"),
  },
  {
    _id: ObjectId("6ac9cb9a462f74169b04a8af"),
    name: "Italian Water Network Contract",
    donor: "Red Cross/Crescent",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd9cac1be6ccd8491745"),
  },
  {
    _id: ObjectId("6ada1f20a607870ec774a3fe"),
    name: "new project",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ada2073a607870ec774a3ff"),
    name: "new project",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ada20a069eb89c9bd5820ee"),
    name: "new project",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    images: [
      "https://pink-ant-682660.hostingersite.com/project-1792680096585-0.webp",
      "https://pink-ant-682660.hostingersite.com/project-1792680096585-1.webp",
    ],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6ada3a3c3d2eb676e125d1b7"),
    name: "test",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6adcb54cc8a82848f08c5398"),
    name: "test project 2",
    donor: "unicef",
    value: "240 $",
    startDate: "20/05/2018",
    endDate: "",
    images: [],
    projectType: ObjectId("6addfd70ac1be6ccd8491740"),
  },
  {
    _id: ObjectId("6adcb6eac8a82848f08c53d3"),
    name: "testing22",
    donor: "unicef",
    value: "240 $",
    startDate: "20/05/2018",
    endDate: "aaaaaa",
    images: [],
    projectType: ObjectId("6addfd70ac1be6ccd8491740"),
  },
  {
    _id: ObjectId("6adcba11c8a82848f08c53d4"),
    name: "Karim project test 2222",
    donor: "unicef",
    value: "240 $",
    startDate: "20/05/2018",
    endDate: "aaaaaa",
    images: [
      "https://pink-ant-682660.hostingersite.com/project-1792850449450-0.webp",
      "https://pink-ant-682660.hostingersite.com/project-1792850449451-1.webp",
      "https://pink-ant-682660.hostingersite.com/project-1792850449452-2.webp",
    ],
    projectType: ObjectId("6addfd70ac1be6ccd8491740"),
  },
  {
    _id: ObjectId("6adcd3a7d1fc0cfaf55fcf83"),
    name: "new project",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    mainImage: "https://localhost/ProjectMainImage1792856999906.png",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6adce29841138a5de92dfcce"),
    name: "new project",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    mainImage:
      "https://pink-ant-682660.hostingersite.com/ProjectMainImage1792860824326.png",
    images: [],
    projectType: ObjectId("6ade1a5a6b8f22c5aa3b5533"),
  },
  {
    _id: ObjectId("6adde3b241138a5de92dfdd6"),
    name: "TestKarimoo",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    mainImage:
      "https://pink-ant-682660.hostingersite.com/ProjectMainImage1792926642528.jpg",
    images: [],
    projectType: ObjectId("6addfd70ac1be6ccd8491740"),
  },
  {
    _id: ObjectId("6addf9695b138743ad6b6b4c"),
    name: "test",
    donor: "",
    value: "",
    startDate: "",
    endDate: "",
    mainImage: "https://localhost/ProjectMainImage1792932201706.jpg",
    images: [],
    projectType: ObjectId("6addf28991d139bef74acfe3"),
  },
]);

// 4. Verify insertion count (Expected: 55)
print("Inserted projects count:", db.projects.countDocuments());

// 5. Verify population test (Simulates Mongoose .populate('projectType'))
db.projects.aggregate([
  {
    $lookup: {
      from: "projecttypes",
      localField: "projectType",
      foreignField: "_id",
      as: "projectType",
    },
  },
  { $unwind: "$projectType" },
  { $limit: 1 },
]);
```

---

## 🗺️ Reference ID Mapping Table

| Project Type Name    | Mongoose Model Reference `_id`         |
| :------------------- | :------------------------------------- |
| `Supplement`         | `ObjectId("6addfd70ac1be6ccd8491740")` |
| `Rehabilitation`     | `ObjectId("6ade1a5a6b8f22c5aa3b5533")` |
| `Arch. Restoration`  | `ObjectId("6addfd81ac1be6ccd8491742")` |
| `Sewage Replacement` | `ObjectId("6addfd8aac1be6ccd8491743")` |
| `Schools Rehab`      | `ObjectId("6addfd95ac1be6ccd8491744")` |
| `Water Supply`       | `ObjectId("6addfd9cac1be6ccd8491745")` |
| `Supply`             | `ObjectId("6addfda3ac1be6ccd8491746")` |
| `Rehab/Solar`        | `ObjectId("6addfdacac1be6ccd8491747")` |
| `Infrastructure`     | `ObjectId("6addfdb3ac1be6ccd8491748")` |

---

## 🧪 Expected API Response After Re-seeding

Once this script runs, calling your Express `GET /api/v1/projects` with `.populate("projectType", "name")` will return structured objects without any `CastError`:

```json
{
  "status": "success",
  "results": 55,
  "data": [
    {
      "_id": "6ac9cb9a462f74169b04a884",
      "name": "al Zerbia Furniture",
      "donor": "UNHCR",
      "value": "",
      "startDate": "2023-12-20T00:00:00.000Z",
      "endDate": "2024-01-15T00:00:00.000Z",
      "images": [],
      "projectType": {
        "_id": "6ade1a5a6b8f22c5aa3b5533",
        "name": "Rehabilitation"
      }
    }
  ]
}
```
