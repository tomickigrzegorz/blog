---
title: "Bitbucket enterprise way - LDAP"
layout: post
tags: atlassian bitbucket
---

[Bitbucket](https://www.atlassian.com/software/bitbucket/){:target="_blank"} is tool of choice in many large companies. One reason for that is it has nice integration with other part of ecosystem like Jira - most often.

By definition it’s ‘just another git server’. It has server side git and UI. Basic choice here to be taken is: SaaA (hosted within https://bitbucket.org) or Self-Hosted. With self-hosted comes following: “Single server or “data center” version?”

“Data Center” is suited for international organisations which would get profit from Mirrors.

![Bitbucket screen](/blog/images/bugfix123-bug_remove_extra_padding.png "Bitbucket screen"){: class="zooom"}

## Domain integration

Natural element of introducing Bitbucket in bigger company is the tit will be connected with Domain. From domain it will be authenticating user access (in general and for specific project).

### How to setup LDAP read?
Main page to answer that question would be: [Connecting Bitbucket Server to an existing LDAP directory](https://confluence.atlassian.com/bitbucketserver/connecting-bitbucket-server-to-an-existing-ldap-directory-776640403.html){:target="_blank"}

Here beside creating read connection with LDAP would be to setup filter which will prevent user and group flood. By that I mean: 

- Bitbucket has user access license - therefore it’s good to control who need access? Jane from HR can be most often confused but idea of such app. 

- Groups like distribution lists most often are not needed to be indexed by Bitbucket. 

Too open configuration will have impact on application w/o real reason for that. In short: it will be Mistake.

## Details

**General configuration**

![Advanced settings](/blog/images/advanced_settings.png "Advanced settings"){: class="zooom"}

From general useful options are:

* Nested Groups
* Filter out expired users
* Enable incremental synchronisation

**User settings**

![User settings](/blog/images/user_schema_settings.png "User settings"){: class="zooom"}

Important part here is: User Object Filter 
```
(&(objectCategory=Person)(sAMAccountName=*)(|(memberOf:1.2.840.113556.1.4.1941:=CN=Bitbucket_Users_Login,OU=Groups,OU=Global,DC=domain,DC=com)))
```

Above filter out all users which are member of given group - in that case Bitbucket_Users_Login.

**Group settings**

![Group settings](/blog/images/group_schema_settings.png "Group settings"){: class="zooom"}

Group Object Filter: 
```
(&(objectCategory=Group)(extensionAttributeApp=syncWithTool=*Bitbucket*))
```
Above will fetch all groups with attribute: ‘extensionAttributeApp’ set to Bitbucket. Simple way to sync only those groups which were nominated to be used within Bitbucket.