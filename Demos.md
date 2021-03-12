---
layout: default
title: CAS - Demos
---

# Demos

<div class="alert alert-warning"><strong>Usage Warning!</strong><p>It is important to note that these are public demo sites, used by the project for basic showcases 
and integration tests and they can be quite unstable in terms of uptime and availability. They are <strong>NOT</strong> set up for internal demos as they may go up and down as the project needs without notice. </p></div>

The following demos are provided by the Apereo CAS project:

| Topic                                                                                      | Source/Branch            | Location | Heroku
|-------------------------------------|----------------------|--------------------------------------------------------|---------------------------------------
| [CAS Web Application Server](index.html)                                                  | `heroku-caswebapp`       | [Link](https://casserver.herokuapp.com/cas) | ![](https://heroku-badge.herokuapp.com/?app=casserver&root=cas)
| [CAS Management Server](services/Installing-ServicesMgmt-Webapp.html)        | `heroku-mgmtwebapp` | [Link](https://casservermgmt.herokuapp.com/cas-management)  | ![](https://heroku-badge.herokuapp.com/?app=casservermgmt&root=cas-management)
| [CAS Boot Administration Server](monitoring/Configuring-Monitoring-Administration.html) | `heroku-bootadminserver` | [Link](https://casbootadminserver.herokuapp.com/) | ![](https://heroku-badge.herokuapp.com/?app=casbootadminserver)
| [CAS Zipkin Server](monitoring/Monitoring-Statistics.html#distributed-tracing)          | `heroku-zipkinserver`    | [Link](https://caszipkinserver.herokuapp.com/) | ![](https://heroku-badge.herokuapp.com/?app=caszipkinserver)
| [CAS Service Discovery Server](installation/Service-Discovery-Guide.html)                 | `heroku-discoveryserver` | [Link](https://caseureka.herokuapp.com/) | ![](https://heroku-badge.herokuapp.com/?app=caseureka)
| [CAS Configuration Server](configuration/Configuration-Server-Management.html)             | `heroku-casconfigserver` | [Link](https://casconfigserver.herokuapp.com/casconfigserver/env) | ![](https://heroku-badge.herokuapp.com/?app=casconfigserver&root=casconfigserver)


Credentials used for the above CAS demos, where needed, are: `casuser` / `Mellon`.

## Internal

The following internal tools are managed by the Apereo CAS project:

| Topic                                                                                      | Source/Branch            | Location | Heroku
|-------------------------------------|----------------------|--------------------------------------------------------|---------------------------------------
| [CAS Overlay Initializr](installation/WAR-Overlay-Installation.html)            | [See this](https://github.com/apereo/cas-initializr)   | [Link](https://casinit.herokuapp.com) | ![](https://heroku-badge.herokuapp.com/?app=casinit)
| CAS GitHub Repository Bot | `heroku-githubbot` | [Link](https://apereocas-githubbot.herokuapp.com/) | ![](https://heroku-badge.herokuapp.com/?app=apereocas-githubbot)
| CAS Gradle Build Remote Cache | `heroku-gradle-buildcache` | [Link](https://cas-gradle-buildcache.herokuapp.com/) | ![](https://heroku-badge.herokuapp.com/?app=cas-gradle-buildcache)


