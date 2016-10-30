using System.Web;
using System.Web.Optimization;

namespace Mario_Fornaroli_CV
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/js/bootstrap.min.js",
                      "~/Scripts/js/parsley.min.js",
                      "~/Scripts/js/lightbox.js",
                      "~/Scripts/js/retina.js",
                      "~/Scripts/mfo_cv.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/fontello/css/-ontello.css",
                      "~/Content/bootstrap/css/bootstrap.css",
                      "~/Content/bootstrap/css/bootstrap-responsive.css",
                      "~/Content/css/progressbar.css",
                      "~/Content/css/lightbox.css",
                      //"~/Content/css/font-awesome.min.css",
                      "~/Content/css/styles.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
