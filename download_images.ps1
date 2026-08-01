$ErrorActionPreference = "SilentlyContinue"
New-Item -ItemType Directory -Force -Path "c:\Users\mahto\Desktop\Saritagirlshostel\images" | Out-Null

$urls = @{
    "exterior.jpg"    = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
    "room-single.jpg" = "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
    "room-double.jpg" = "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    "room-triple.jpg" = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    "dining.jpg"      = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    "study.jpg"       = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    "community.jpg"   = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
    "security.jpg"    = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
}

foreach ($item in $urls.GetEnumerator()) {
    $dest = Join-Path "c:\Users\mahto\Desktop\Saritagirlshostel\images" $item.Key
    Write-Host "Downloading $($item.Key)..."
    try {
        Invoke-WebRequest -Uri $item.Value -OutFile $dest -UseBasicParsing -TimeoutSec 15
    } catch {
        Write-Host "Error downloading $($item.Key)"
    }
}
Write-Host "All images processed."
