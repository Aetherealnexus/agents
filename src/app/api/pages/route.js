import fs from 'fs';
import path from 'path';

export async function GET(req, res) {
  const dataDir = path.join(process.cwd(), 'public/data');

  try {
    // Read all files in the public/data directory
    const files = fs.readdirSync(dataDir);

    const pages = files.map((file) => {
      // Read each file content
      const filePath = path.join(dataDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);

      // Return the page data with title and path
      return {
        title: jsonData.header.title,
        path: `pages/${file.replace('.json', '')}`, // Generate path based on filename
      };
    });

    return new Response(JSON.stringify(pages), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error reading data files' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
