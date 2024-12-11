export default async function updateServerData() {
  const data = collectInputData();

  try {
    const response = await fetch('/api/update-options', {
      method: 'POST', // POST 또는 PUT 요청
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Data uploaded successfully:', result.fileUrl);
    } else {
      console.error('Failed to update data:', await response.json());
    }
  } catch (error) {
    console.error('Error updating data:', error);
  }
}