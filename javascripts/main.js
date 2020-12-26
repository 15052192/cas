var CONST_CURRENT_VER = "development";
var CONST_SITE_TARGET_DIR = "/_site/";

function isDocumentationSiteViewedLocally() {
  return location.href.indexOf(CONST_SITE_TARGET_DIR) != -1;
}

function generateNavigationBarAndCrumbs() {
  var crumbs = "<ol class='breadcrumb'>";

  var activeVersion = getActiveDocumentationVersionInView(true);

  var uri = new URI(document.location);
  var segments = uri.segment();

  for (var i = 1; i < segments.length; i++) {
    var clz = ((i + 1) >= segments.length) ? 'breadcrumb-item active' : 'breadcrumb-item ';
    clz += "capitalize";

    var page = null;

    if ((i + 1) >= segments.length) {
      page = document.title.replace("CAS -", "").trim();
    } else {
      page = segments[i].replace(".html", "").replace(/-/g, " ").replace(/_/g, " ").replace(/index/g, "");
    }
    crumbs += "<li class='" + clz + "'><a href='#'>" + page + "</a></li>";
  }

  crumbs += "</ol>";

  $("#docsNavBar").prepend(crumbs);

}

function getActiveDocumentationVersionInView(returnBlankIfNoVersion) {
  var currentVersion = CONST_CURRENT_VER;
  var href = location.href;
  var index = isDocumentationSiteViewedLocally() ? href.indexOf(CONST_SITE_TARGET_DIR) : -1;

  if (index == -1) {
    var uri = new URI(document.location);

    if (uri.filename() != uri.segment(1) && uri.segment(1) != "developer") {
      currentVersion = uri.segment(1);
    } else if (returnBlankIfNoVersion) {
      return "";
    }
  } else {
    href = href.substring(index + 7);
    index = href.indexOf("/");
    currentVersion = href.substring(0, index);
  }
  return currentVersion;
}


function loadSidebarForActiveVersion() {
  $.get("/cas/" + getActiveDocumentationVersionInView() + "/sidebar.html", function (data) {

    var menu = $(data);

    if (menu.first().is('ul')) {

      menu.addClass('nav flex-column').attr('id', 'sidebarTopics');

      var topLevel = menu.find('> li>a');

      var topLevelUl = menu.find('> li>ul');

      var subLevel = menu.find('> li ul');

      var nestedMenu = menu.find("ul li").has("ul").children('a');

      topLevel.each(function () {
        var el = $(this);
        sidebarTopNav(el);
      });

      topLevelUl.each(function () {
        var el = $(this);
        el.attr({
          'data-parent': '#sidebarTopics'
        });

        if (!el.prev().hasClass('collapsed')) {
          el.addClass('show');
        };
      });

      subLevel.each(function () {
        sidebarSubNav($(this));
      });

      nestedMenu.each(function () {
        sidebarTopNav($(this));
      });

      $('#sidebar').append(menu);

      generateSidebarLinksForActiveVersion();

    }
  });
}

function sidebarTopNav(el) {
  // If the link is an anchor, then wire up toggle functionality, otherwise leave it.
  if (el.attr('href').search(/(?:^|)#/g) >= 0) {
    el.attr({
      'data-toggle': "collapse",
      'aria-expanded': "false",
      title: $(this)[0].innerText,
      class: 'collapsed'
    })
    .append('<i class="expand"></i></a>');
  }

  if (pageSection && el.text() == pageSection) {
    el.removeClass('collapsed')
  }

};


function sidebarSubNav(el) {
  var prevId = $(el).prev('a').attr('href');

  if (prevId.search(/^#.*$/) >= 0) {
    prevId = prevId.substr(1);
  } else {
    prevId = '';
  }

  if (!prevId == '') {
    $(el).addClass('nav flex-column collapse subnav ml-3').attr('id', prevId);
  } else {
    $(el).addClass('nav flex-column subnav ml-3');
  }
}

function generateSidebarLinksForActiveVersion() {
  $('#sidebar a').each(function () {
    var href = this.href;

    if (href.indexOf("$version") != -1) {
      href = href.replace("$version", "cas/" + getActiveDocumentationVersionInView());
      $(this).attr('href', href);
    }
  });
}

function generateToolbarIcons() {
  var CAS_REPO_URL_GITHUB = $('#forkme_banner').attr('href');
  var activeVersion = getActiveDocumentationVersionInView(true);

  var uri = new URI(document.location);
  var segments = uri.segment();
  var page = "";

  for (var i = 1; i < segments.length; i++) {
    page += segments[i] + "/";
  }
  editablePage = page.replace(".html", ".md");
  editablePage = editablePage.replace(CONST_CURRENT_VER, "")
  editablePage = editablePage.replace(activeVersion, "")
  if (editablePage == "") {
    editablePage = "index.md";
  }

  var imagesPath = "/cas/images/";
  if (isDocumentationSiteViewedLocally()) {
    var loc = location.href;
    var index = loc.indexOf(CONST_SITE_TARGET_DIR);
    var uri2 = loc.substring(0, index + CONST_SITE_TARGET_DIR.length);
    imagesPath = uri2 + "images/"
  }


  if (activeVersion != CONST_CURRENT_VER && activeVersion != "") {
    var linkToDev = "/cas/" + page.replace(activeVersion, CONST_CURRENT_VER).replace("//", "/");
    linkToDev = linkToDev.replace("html/", "html");

    $('#toolbarIcons').append("<a href='" + linkToDev +
      "'><i class='fa fa-code' title='See the latest version of this page'></i></a>");
  }

  var baseLink = CAS_REPO_URL_GITHUB;
  var editLink = "";
  var historyLink = "";
  var deleteLink = "";

  if (activeVersion == "") {
    editLink = baseLink + "/edit/gh-pages/";
    historyLink = baseLink + "/commits/gh-pages/";
    deleteLink = baseLink + "/delete/gh-pages/";
  } else if (activeVersion == CONST_CURRENT_VER) {
    editLink = baseLink + "/edit/master/docs/cas-server-documentation/";
    historyLink = baseLink + "/commits/master/docs/cas-server-documentation/";
    deleteLink = baseLink + "/delete/master/docs/cas-server-documentation/";
  } else if (activeVersion.indexOf("5.") != -1 || activeVersion.indexOf("6.") != -1) {
    editLink = baseLink + "/edit/" + activeVersion + "/docs/cas-server-documentation/";
    historyLink = baseLink + "/commits/" + activeVersion + "/docs/cas-server-documentation/";
    deleteLink = baseLink + "/delete/" + activeVersion + "/docs/cas-server-documentation/";
  } else if (activeVersion != CONST_CURRENT_VER) {
    editLink = baseLink + "/edit/" + activeVersion + "/cas-server-documentation/";
    historyLink = baseLink + "/commits/" + activeVersion + "/cas-server-documentation/";
    deleteLink = baseLink + "/delete/" + activeVersion + "/cas-server-documentation/";
  }

  editLink += editablePage;


  $('#toolbarIcons').append("<a target='_blank' href='" + editLink +
    "'><i class='fa fa-pencil-alt' title='Edit with Github'></i></a>");

  historyLink += editablePage;


  $('#toolbarIcons').append("<a target='_blank' href='" + historyLink +
    "'><i class='fa fa-history' title='View commit history on Github'></i></a>");

  deleteLink += editablePage;


  $('#toolbarIcons').append("<a target='_blank' href='" + deleteLink +
    "'><i class='fa fa-times' title='Delete with Github'></i></a>");
}

function generatePageTOC() {
  var toc = $('#tableOfContents ul');
  var page_contents = $('#pageContents ul');
  var arr = [];

  var headings = $('#cas-docs-container').find('h1, h2,h3');
  var subMenu = false;
  var subMenuId = null;

  headings.each(function (idx) {
    if ($(this).is('h1,h2')) {
      // If it is a H2 and the submenu flag is NOT set, then arr.push('<li>h2 text')
      if (!subMenu) {
        arr.push(tocItem(this.id, this.textContent));
      }

      // If it is a H2 and the submenu flag is set, then arr.push('</ul><li>h2 text')
      if (subMenu) {
        subMenu = false;
        arr.push('</ul></li>');
        arr.push(tocItem(this.id, this.textContent));
      }
    }
    ; // End H2

    if ($(this).is('h3')) {
      // If it is a H3 and the submenu flag is NOT set, then set the submenu flag then arr.push('<ul><li>h3 text</li>')
      if (!subMenu) {
        subMenu = true;
        arr.push('<ul class="nav flex-column">');
        arr.push(tocItem(this.id, this.textContent));
      } else if (subMenu) {
        arr.push(tocItem(this.id, this.textContent));
      }
    }
    ; // End H2
  });

  // After the loop, close the last <li> tag
  if (subMenu) {
    arr.push('</ul></li>');
  } else {
    arr.push('</li>');
  }

  // toc.append(arr.join(''));
  page_contents.append(arr.join(''));
}

function tocItem(id, text) {
  return '<li class="toc-entry toc-h2"><a href="#' + id + '">' + text + '</a>';
}


function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function responsiveImages() {
  $('img').each(function () {
    $(this).addClass('img-fluid');
  });
}

function responsiveTables() {
  $('table').each(function () {
    $(this).addClass('table table-responsive');
  });
}


function enableBootstrapTooltips() {
  $('[data-toggle="tooltip"]').tooltip();
}

function generateOverlay(artifactId) {
  var id = artifactId.replace("cas-server-", "")
  
  $("#overlayform").remove();
  $('body').append(" \
  <form id='overlayform' action='https://casinit.herokuapp.com/starter.zip' method='post'> \
  <input type='submit' value='submit' /> \
  <input type='hidden' name='dependencies' value='" + id + "' /> </form>");
  $("#overlayform").submit();
}

$(function () {
  loadSidebarForActiveVersion();
  generatePageTOC();
  generateToolbarIcons();
  generateNavigationBarAndCrumbs();

  responsiveImages();
  responsiveTables();

  var formattedVersion = getActiveDocumentationVersionInView();
  if (formattedVersion != "" && formattedVersion.indexOf(CONST_CURRENT_VER) == -1) {
    formattedVersion = " (" + formattedVersion + ")"
  } else {
    formattedVersion = "";
  }

  enableBootstrapTooltips();
});


$(function () {
  return $("h2, h3, h4, h5, h6").each(function (i, el) {
    var $el, icon, id;
    $el = $(el);
    id = $el.attr('id');
    icon = '<i class="fa fa-link"></i>';
    if (id) {
      return $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(icon));
    }
  });
});
