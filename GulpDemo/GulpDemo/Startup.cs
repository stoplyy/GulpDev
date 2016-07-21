using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GulpDemo.Startup))]
namespace GulpDemo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
