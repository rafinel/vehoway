import JSZip from 'jszip';
import { createClient } from '@sanity/client';
import { z } from 'zod';

const envSchema = z.object({
  SANITY_DATASET: z.string().min(1),
  SANITY_PROJECT_ID: z.string().min(1),
  SANITY_API_TOKEN: z.string().min(1).optional()
});
const env = envSchema.parse({
  SANITY_API_TOKEN: "skvpFB0yt9ViFzPWkzRY9tcO9p4BQDCMnTA8Yb78jlsXwNECJiNvHLn8q5mcepdzmHYT4zeghERRixn8JL05xylVSCOypKRyM3JZkUG8f8CsoV58Dc9J3ls956bHV0elxbYIB8mIzsHZFVmL8uB2wVam15SU4JtRGBgP7EGQssmWZoAfmoLN",
  SANITY_DATASET: "production",
  SANITY_PROJECT_ID: "qu8uhzzm"
});
const ENV = {
  sanityApiToken: env.SANITY_API_TOKEN,
  sanityDataset: env.SANITY_DATASET,
  sanityProjectId: env.SANITY_PROJECT_ID
};

const SanityCatalogsCollection = (sanity) => {
  return {
    getCatalogs: async () => {
      return await sanity.fetch(`
        *[_type == "catalog" && !(_id in path("drafts.**"))] | order(name asc) {
          "id": _id,
          name,
          "image": {
            "id": image.asset->_id,
            "url": image.asset->url,
            "alt": image.alt
          },
          "pdfFile": {
            "id": pdfFile.asset->_id,
            "url": pdfFile.asset->url
          }
        }
      `);
    }
  };
};

const sanity = createClient({
  apiVersion: "2026-04-30",
  dataset: ENV.sanityDataset,
  projectId: ENV.sanityProjectId,
  useCdn: false
});
const sanityCatalogsCollection = SanityCatalogsCollection(sanity);

const prerender = false;
function sanitizeFileName(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}
const GET = async () => {
  const catalogs = await sanityCatalogsCollection.getCatalogs().catch(() => []);
  if (catalogs.length === 0) {
    return new Response("Nenhum catalogo disponivel para download.", {
      status: 404
    });
  }
  const zip = new JSZip();
  await Promise.all(
    catalogs.map(async (catalog, index) => {
      const response = await fetch(catalog.pdfFile.url);
      if (!response.ok) {
        throw new Error(`Falha ao baixar PDF do catalogo ${catalog.id}.`);
      }
      const fileBuffer = await response.arrayBuffer();
      const safeName = sanitizeFileName(catalog.name) || `catalogo-${index + 1}`;
      zip.file(`${safeName}.pdf`, fileBuffer);
    })
  );
  const zipBuffer = await zip.generateAsync({ type: "arraybuffer" });
  return new Response(zipBuffer, {
    headers: {
      "Content-Disposition": 'attachment; filename="catalogos-vehoway.zip"',
      "Content-Type": "application/zip",
      "Cache-Control": "no-store"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
