using Microsoft.AspNetCore.Mvc;

namespace api.Services
{
    public static class FileService
    {
        public static string UploadCarImage(IFormFile file)
        {

            string[] permittedExtensions = { ".png", ".jpg" };
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (string.IsNullOrEmpty(ext) || !permittedExtensions.Contains(ext))
            {
                return "invalid image";
            }
            var combine = Guid.NewGuid() + ext;
            var filePath = Path.Combine(Environment.CurrentDirectory, @"Assets\", combine);
            using (var stream = System.IO.File.Create(filePath))
            {
                file.CopyTo(stream);
            }
            return combine;
        }
        public static FileContentResult GetCarImage(string file)
        {
            var filePath = Path.Combine(Environment.CurrentDirectory, @"Assets\", file);
            if(!File.Exists(filePath)){
                filePath = Path.Combine(Environment.CurrentDirectory, @"Assets\", "default-car.jpg");
            }
            var ext = Path.GetExtension(filePath).ToLowerInvariant().Split(".")[1];
            var mime = "image/" + ext;
            byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
            var result = new FileContentResult(fileBytes, mime);
            return result;
        }
    }
}