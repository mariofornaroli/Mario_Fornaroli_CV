using Mario_Fornaroli_CV.Helpers;
using Mario_Fornaroli_CV.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace Mario_Fornaroli_CV.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult SetCulture(string culture)
        {
            //// Validate input
            //culture = CultureHelper.GetImplementedCulture(culture);
            //// Save culture in a cookie
            //HttpCookie cookie = Request.Cookies["_culture"];
            //if (cookie != null)
            //    cookie.Value = culture;   // update cookie value
            //else
            //{
            //    cookie = new HttpCookie("_culture");
            //    cookie.Value = culture;
            //    cookie.Expires = DateTime.Now.AddYears(1);
            //}
            //Response.Cookies.Add(cookie);
            return RedirectToAction("Index");
        }         

        public ActionResult GetCvPdf()
        {
            string filename = "~/Content/Pdf_CV/CV Ing. Mario Fornaroli.pdf";
            return File(filename, "application/pdf", "Mario_Fornaroli_CV.pdf");
            //return File(filename, "application/pdf", Server.UrlEncode(filename));
        }

        public ActionResult ContactMe(string form_name, string form_email, string form_message)
        {
            string retStr;
            bool res = SendMail("mario.fornaroli@yahoo.it", form_email, "",
                                string.Concat("Message from: ", form_name), form_message);
            if (res)
                return Json(new { res = true, resStr = Resources.Resources.mailTxSuccess }, JsonRequestBehavior.AllowGet);
            else
                return Json(new { res = false, resStr = Resources.Resources.mailTxFailure }, JsonRequestBehavior.AllowGet);
        }

        private bool SendMail(string toList, string from, string ccList, string subject, string body)
        {
            MailMessage message = new MailMessage();
            SmtpClient smtpClient = new SmtpClient();
            try
            {
                MailAddress fromAddress = new MailAddress(from);
                message.From = fromAddress;
                message.To.Add(toList);
                if (ccList != null && ccList != string.Empty)
                    message.CC.Add(ccList);
                message.Subject = subject;
                message.IsBodyHtml = true;
                message.Body = string.Concat(subject, "<br/><br/>", "From mail:<br/>", from, "<br/><br/>", "Body:<br/>", body); ;
                smtpClient.Host = "smtp.gmail.com";
                smtpClient.Port = 587;
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = true;
                smtpClient.Credentials = new System.Net.NetworkCredential("mario.fornaroli84@gmail.com", "Maomao@01");
                smtpClient.Send(message);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

    }
}