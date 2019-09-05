import { withAppSyncData } from 'next-apollo-appsync'

const config =  {
    "url": "https://qntpkh3pxrhm5bw7phb6jqpwca.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    "region": "ap-northeast-1",
    auth: {
        "type": "API_KEY",
        "apiKey": "da2-6u4vp6jwsndzjeu46zninewlnq",
    }
}

export default withAppSyncData(config)
