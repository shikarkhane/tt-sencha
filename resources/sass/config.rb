# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework automatically.
load File.join(dir, '..', '..', 'touch', 'resources', 'themes')

# Compass configurations
sass_path = dir
css_path = File.join(dir, "..", "css")
# fonts_dir = File.join(dir, "..", "sass")

# Require any additional compass plugins here.
images_path = File.join(dir, "..", "images")
output_style = :compressed
environment = :production
asset_cache_buster :none
