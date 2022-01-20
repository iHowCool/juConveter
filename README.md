# JSON URL CONVERTER README
> 这是一个json和url相互转换的工具
> 1. json -> url 会将json的所有key和value进行uri component encode 一次 
> 2. url -> json 会将url的key和value都uri component decode 一次

[插件地址](https://marketplace.visualstudio.com/items?itemName=juconvertor.juconvertor)

命令: `JSON -> URL   URL->JSON`


> commonInfo : 
> 1. 在 https://dev.azure.com 这里创建token,用于将插件上传到azure ops.(vscode marketplace是承载在上面的)
> 2. 在 https://marketplace.visualstudio.com/manage 创建一个publisher与插件中的相同.
> 3. 本地打包 vsce packege 手动上传 / 或者 vs login <publisher name> 然后用token登录后.(手动上传需要登录微软账号,所以不需要token了)