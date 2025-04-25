const UNSPLASH_ACCESS_KEY = `O7WJ_WvSipp5h2TP_Rt8eQ728WDz35dEvyAbROutkSI`;

// unsplash.ts
export async function fetchRandomPhotos(count = 30) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=${count}`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    }
  );

  if (!response.ok) throw new Error("Failed to fetch random photos");
  // return response.json(); // returns an array

  const data = await response.json();

  // Filter to images with similar aspect ratios (e.g., 4:3)
  return data
    .filter((photo: any) => {
      const ratio = photo.width / photo.height;
      return ratio <= 1.5;
    })
    .slice(0, 12);
  // }
}

// const UNSPLASH_ACCESS_KEY = "O7WJ_WvSipp5h2TP_Rt8eQ728WDz35dEvyAbROutkSI";

// export async function fetchRandomPhotos(count = 30) {
//   const response = await fetch(
//     `https://api.unsplash.com/photos/random?count=${count}`,
//     {
//       headers: {
//         Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
//       }
//     }
//   );

//   if (!response.ok) throw new Error("Failed to fetch random photos");

//   const data = await response.json();

//   // Filter to images with similar aspect ratios (e.g., 4:3)
//   return data
//     .filter((photo: any) => {
//       const ratio = photo.width / photo.height;
//       return ratio >= 1.3 && ratio <= 1.35;
//     })
//     .slice(0, 12);
// }
