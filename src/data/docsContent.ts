// src/data/docsContent.ts

export const DOCS_XML = `
  <section id="typography" title="Typography" icon="mouse">
    <h1>Markup Features</h1>
    <p>
      The engine allows you to write beautiful documentation using simple XML-like syntax.
      No need to layout React components manually anymore!
    </p>

    <grid cols="2">
        <col>
            <h3>Text Formatting</h3>
            <p>
                You can use <b>bold text</b>, <i>italics</i>, <u>underlining</u> 
                and even <kbd>Ctrl+C</kbd> (hotkeys).
            </p>
            <p>
                Inside text, you can use <link href="https://google.com">links</link> and 
                <tooltip text="Tooltip text!">tooltips</tooltip> on hover.
                There are also <badge color="red">badges</badge> of different <badge color="green">colors</badge>.
            </p>
        </col>
        <col>
            <h3>Quotes</h3>
            <quote author="Jason Statham">
                If the code is not in the documentation, it does not exist.
            </quote>
        </col>
    </grid>
  </section>

  <section id="components" title="UI Components" icon="layout">
    <h2>Attention Blocks</h2>
    <p>Use alerts to highlight important information.</p>
    
    <grid cols="2">
        <col>
            <alert type="info">This is an informational block (info).</alert>
            <alert type="success">Operation completed successfully (success).</alert>
        </col>
        <col>
            <alert type="warn">Warning, potential errors (warn).</alert>
            <alert type="danger">Critical error or danger (danger).</alert>
        </col>
    </grid>

    <separator />

    <h2>Cards and Links</h2>
    <grid cols="3">
        <col>
             <card title="Telegram" href="https://t.me/holyresume">Update channel</card>
        </col>
        <col>
             <card title="GitHub" href="https://github.com/whitfielfur/blobbo-prjct">Project source code</card>
        </col>
        <col>
             <card title="Support" href="https://t.me/arthurfur">Support service</card>
        </col>
    </grid>
  </section>

  <section id="commands" title="Commands &amp; API" icon="server">
    <h2>Bot Commands</h2>
    <p>Special component <code>&lt;cmd&gt;</code> for describing functionality.</p>

    <cmd name="/ban" desc="Bans a user" tag="Admin">
        <p>Permanently bans a user from the server. Requires administrator permissions.</p>
        <usage>/ban target:@User reason:Spam</usage>
        <param name="target" type="User" req="true">User to ban</param>
        <param name="reason" type="String">Ban reason (logged in audit)</param>
        <param name="days" type="Int">Delete messages for X days</param>
    </cmd>

    <cmd name="/rank" desc="Check level" tag="Global">
        <p>Displays a beautiful card with rank and XP.</p>
        <usage>/rank [user]</usage>
    </cmd>

    <separator />

    <h2>API Endpoints</h2>
    <p>Beautiful display of HTTP methods.</p>

    <api method="GET" url="/v1/guilds/{id}/stats">
        Get server statistics for the last 30 days.
    </api>
    
    <api method="POST" url="/v1/users/{id}/xp">
        Manually add XP to a user.
        <codeblock lang="json" title="Body Payload">
{
  "amount": 150,
  "reason": "Event winner"
}
        </codeblock>
    </api>
  </section>

  <section id="interactive" title="Interactive" icon="zap">
    <h2>Tabs</h2>
    <p>Perfect for instructions across different OSs or programming languages.</p>

    <tabs>
        <tab title="npm">
            <p>Installation via Node Package Manager:</p>
            <codeblock lang="bash">npm install blobbo-core --save</codeblock>
            <alert type="info">Requires Node.js v16+</alert>
        </tab>
        <tab title="yarn">
            <p>Installation via Yarn:</p>
            <codeblock lang="bash">yarn add blobbo-core</codeblock>
        </tab>
        <tab title="pnpm">
            <p>The fastest option:</p>
            <codeblock lang="bash">pnpm add blobbo-core</codeblock>
        </tab>
    </tabs>

    <h2>Spoilers</h2>
    <details summary="Click to reveal the secret">
        <p>Hidden content, long logs, or FAQs can be placed here.</p>
        <img src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUydTNkczF3b3VqazFydnNteTUzOWI5eHo4cGZjN2psOG5nazh1NTQ2ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mcsPU3SkKrYDdW3aAU/200w.gif" width="sm" align="left" caption="Coding cat" />
    </details>
  </section>

  <section id="media" title="Media" icon="globe">
    <h2>Images</h2>
    <p>Support for captions, sizes, and alignment.</p>

    <img src="https://dspncdn.com/a1/media/692x/59/4d/2a/594d2a0d3661d89a2274ee1665af4017.jpg" 
         caption="thiz iz zo cutez!!!! image (width=full)" 
         shadow="true" />
    
    <grid cols="2">
        <col>
            <img src="https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/872822c5e50dc71f345416098d29fc3ae5cd26c1-1280x720.jpg" width="full" caption="Cyberpunk 1" />
        </col>
        <col>
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/644eb087007768417a847e52c38eeaf34b57fd12/page_bg_raw.jpg?t=1766141193" width="full" caption="Cyberpunk 2" />
        </col>
    </grid>

    <h2>Video</h2>
    <video src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Rick Roll" />
  </section>

  <section id="data" title="Tables &amp; Lists" icon="list">
    <h2>Tables</h2>
    
    <table>
        <thead>
            <tr>
                <th>Feature</th>
                <th>Free</th>
                <th>Premium</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Basic Stats</td>
                <td>Yes</td>
                <td>Yes</td>
            </tr>
            <tr>
                <td>Leaderboards</td>
                <td>Top 10</td>
                <td>Top 100</td>
            </tr>
            <tr>
                <td>Custom Background</td>
                <td>No</td>
                <td>Yes</td>
            </tr>
        </tbody>
    </table>

    <grid cols="2">
        <col>
            <h3>Bulleted List</h3>
            <list>
                <li>First item</li>
                <li>Second item with <b>bold</b></li>
                <li>Third item</li>
            </list>
        </col>
        <col>
            <h3>Checklist</h3>
            <list type="check">
                <li checked="true">Create server</li>
                <li checked="true">Invite bot</li>
                <li checked="false">Configure roles</li>
            </list>
        </col>
    </grid>
  </section>

  <section id="steps" title="Instructions" icon="hash">
    <h2>Installation Process</h2>
    
    <step num="1" title="Preparation">
        Ensure you have administrator rights on the server.
    </step>
    
    <step num="2" title="Configuration">
        Enter the <code>/setup</code> command and follow the instructions.
        <usage>/setup mode:auto</usage>
    </step>
    
    <step num="3" title="Finish">
        The bot will send a welcome message. Enjoy!
    </step>
  </section>
    <h2>See the docsContent.ts yourself!</h2>
`;
