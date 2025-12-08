# PowerShell script to download all Unsplash images used in the project
# Run this script to download images to src/assets folder

$assetsPath = "src\assets"
$baseUrl = "https://images.unsplash.com"

# List of all unique images with descriptive names
$images = @(
    @{id="1586023492125-27b2c045efd7"; name="interiors.jpg"; width=800; height=600},
    @{id="1449824913935-59a10b8d2000"; name="urban-landscape.jpg"; width=800; height=600},
    @{id="1524758631624-e2822e304c36"; name="climate-sustainable.jpg"; width=800; height=600},
    @{id="1581092160562-40aa08e78837"; name="engineering.jpg"; width=1200; height=800},
    @{id="1488590528505-98d2b5aba04b"; name="technology-research.jpg"; width=1200; height=800},
    @{id="1487958449943-2429e8be8625"; name="architectural-design.jpg"; width=800; height=600},
    @{id="1616486338812-3dadae4b4ace"; name="interior-design-service.jpg"; width=800; height=600},
    @{id="1497435334941-8c899ee9e8e9"; name="sustainable-design-service.jpg"; width=800; height=600},
    @{id="1561070791-2526d30994b5"; name="bim-3d-modeling.jpg"; width=800; height=600},
    @{id="1504307651254-35680f356dfd"; name="project-management.jpg"; width=800; height=600},
    @{id="1504711434969-e33886168f5c"; name="news.jpg"; width=1200; height=800},
    @{id="1441974231531-c6227db76b6e"; name="climate-section.jpg"; width=1200; height=800},
    @{id="1522071820081-009f0129c71c"; name="vacancies-careers.jpg"; width=1200; height=800},
    @{id="1529156069898-49953e39b3ac"; name="equity-diversity.jpg"; width=800; height=600},
    @{id="1552664730-d307ca884978"; name="csr.jpg"; width=800; height=600},
    @{id="1497366216548-37526070297c"; name="studio-homepage.jpg"; width=1200; height=800},
    @{id="1497366754035-f200968a6e72"; name="contact.jpg"; width=1200; height=800},
    @{id="1486406146926-c627a92ad1ab"; name="mixed-use.jpg"; width=1200; height=800},
    @{id="1522771739844-6a9f6d5f14af"; name="cultural.jpg"; width=1200; height=800},
    @{id="1451187580459-43490279c0fa"; name="technology-subtopic.jpg"; width=1200; height=800},
    @{id="1514565131-fce0801e5785"; name="mixed-use-2.jpg"; width=1200; height=800},
    @{id="1600596542815-ffad4c1539a9"; name="residential-1.jpg"; width=1200; height=800},
    @{id="1600585154340-be6161a56a0c"; name="residential-2.jpg"; width=1200; height=800},
    @{id="1578662996442-48f60103fc96"; name="cultural-2.jpg"; width=1200; height=800},
    @{id="1558618666-fcd25c85cd64"; name="technology-3d.jpg"; width=1200; height=800}
)

Write-Host "Downloading images to $assetsPath..." -ForegroundColor Green

foreach ($img in $images) {
    $url = "$baseUrl/photo-$($img.id)?w=$($img.width)&h=$($img.height)&fit=crop&q=80"
    $outputPath = Join-Path $assetsPath $img.name
    
    Write-Host "Downloading $($img.name)..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
        Write-Host "  Success: $($img.name)" -ForegroundColor Green
    } catch {
        Write-Host "  Failed: $($img.name) - $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Download complete!" -ForegroundColor Green
Write-Host "Next step: Update all image references in the codebase to use local assets." -ForegroundColor Cyan
