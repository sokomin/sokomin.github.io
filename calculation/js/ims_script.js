// 画像のパスとファイル名の形式に基づいて、画像を動的に読み込む
async function loadSampleImages(fi, ti) {
    const sampleImages = [];
    for (let i = fi; i < ti; i++) {
        // const filename = `https://sokomin.github.io/item/design/image/item/iconItem_${String(i).padStart(4, '0')}.png`;
        const filename = `../item/design/image/item/iconItem_${String(i).padStart(4, '0')}.png`;
        const img = new Image();
        img.crossOrigin = "anonymous";  // CORSポリシーを適用
        img.src = filename;

        // 画像が読み込まれるのを待つ
        await new Promise((resolve) => {
            img.onload = () => resolve();
        });

        sampleImages.push(img);
    }
    return sampleImages;
}

function calculatePixelSimilarity(imgData1, imgData2) {
    let matchingPixels = 0;

    for (let i = 0; i < imgData1.data.length; i += 4) {
        if (
            imgData1.data[i] === imgData2.data[i] &&
            imgData1.data[i + 1] === imgData2.data[i + 1] &&
            imgData1.data[i + 2] === imgData2.data[i + 2]
        ) {
            matchingPixels++;
        }
    }

    const totalPixels = imgData1.data.length / 4;
    return (matchingPixels / totalPixels) * 100;
}

async function findMatchingImage() {
    // ローディングマークを表示
    try {
        document.getElementById('loading').classList.remove('hidden');
        let highestSimilarity = 0;
        let mostSimilarImage;
        let most_i = 0

        for (var j = 0; j < 45; j++) {
            let fi=j*100
            let ti=j*100+99
            const sampleImages = await loadSampleImages(fi, ti);
            const imageInput = document.getElementById('imageInput');
            const file = imageInput.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 34;
                    canvas.height = 34;

                    ctx.drawImage(img, 0, 0, 34, 34);
                    const imgData1 = ctx.getImageData(0, 0, 34, 34);

                    // const sampleImages = document.getElementsByClassName('sample-image');
                    // let highestSimilarity = 0;

                    let il = 0
                    for (const sampleImg of sampleImages) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(sampleImg, 0, 0, 34, 34);
                        const imgData2 = ctx.getImageData(0, 0, 34, 34);

                        const similarity = calculatePixelSimilarity(imgData1, imgData2);
                        if (similarity > highestSimilarity) {
                            highestSimilarity = similarity;
                            mostSimilarImage = sampleImg;
                            most_i = fi+il
                        }
                        il++;
                        if (highestSimilarity > 99.5) {
                            break;
                        }
                    }
                };
            };
            console.log(`${fi}: Most similar image found with ${highestSimilarity.toFixed(2)}% similarity. (image:${most_i})`)
            reader.readAsDataURL(file);
            if (highestSimilarity > 99.5) {
                break;
            }
        }
        document.getElementById('result').innerText = `一致度 ${highestSimilarity.toFixed(2)}% の画像が見つかりました。 (image_id:${String(most_i).padStart(4, '0')})`;
        document.getElementById('result').appendChild(mostSimilarImage.cloneNode());

    } catch (error) {
        // エラーメッセージを表示
        console.error('An error occurred:', error);
        alert('An error occurred. Please try again.');
    } finally {
        // ローディングマークを非表示
        document.getElementById('loading').classList.add('hidden');
    }
}
