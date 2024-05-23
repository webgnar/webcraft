// script.js
document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('image-container');

    const layers = [
        ['https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AKVV8SQX79SsFkPVRnKahNcHmnLc6w9zMSwkW6TCVi1dBcjQAUGuwXcUfFvMxQJ.png',
         'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AK3gFjxckmhn5mBN5SF5y4QqLyrMUUvwHm7YxjjxZTu2uQ4Vhj5GCwGVfcPPSGV.png',
          'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AKe7WKjjggw3qf69JpmVJEZtmnEX8eAXXhowp2YxZUMs45o2qk3pm3nwUdrBtwT.png',
          'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AKF89ZVKkV9SA6D9hCyvQpjxe8ZMUAQ424tbkV4feeJ1k1vdKAFg1cKgRnFMiDW.png'
        ],
        ['https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AK54FEoftXWqGKh9WimtHEvAcfVKKcVt2KKmet63gTyaUByXQUZdMopqnCQwTHV.png',
         'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AKU22oRQajzATrmymAnz63ZsWmYCqqdDhTgU5RB4wJcFEcYzccCCFQRvuFj1R9e.png',
          'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AK9JweYG73XWMvkbpSNEdM8fK9EBL9J5nF4vFG2Y5HvFdUZiLiP6JfZPKhsTNen.png',
          'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AKLt3PHujGNKSEK81PrcivzMNAyvm5CWj8zMdGrN4whm5zfQVge16DFbi3kkLRq.png'
        ],
        ['https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJbhBb9Ev3i1cHKtjoxtsCAaXK9njP56dzMwBRwfZVZ21WseKsCa6Za7kL8P6EH.png',
         'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJbhBb9Ev3i1cHKtjoxtsCAaXK9njP56dzMwBRwfZVZ21WseKsCa6ZkhfN6CfF8.png',
          'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJbhCGcViVSiKr1kP6uS8DAbaQ2LnL4YKggTz3GdqSKwLmuaj8B4ddrw8uKU5rc.png',
          'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJbhFMUUphkn9AUhSwnz9jtr5uop9gjciAcBsRQxHoqhhgM21ng66e7fXiriTTK.png'
        ]
    ];

    // Initialize the container with the first image of each layer
    layers.forEach((layer, index) => {
        const img = document.createElement('img');
        const randomIndex = Math.floor(Math.random() * layer.length);
        img.src = layer[randomIndex];
        img.dataset.layerIndex = index;
        img.style.zIndex = index;
        img.style.display = 'block'; // Show the image
        imageContainer.appendChild(img);
    });

    // Function to get a random index for an array
    const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

    // Shuffle images on click
    imageContainer.addEventListener('click', () => {
        layers.forEach((layer, layerIndex) => {
            const images = imageContainer.querySelectorAll(`img[data-layer-index="${layerIndex}"]`);
            const randomIndex = getRandomIndex(layer);
            images[0].src = layer[randomIndex];
        });
    });
});