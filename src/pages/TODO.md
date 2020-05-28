TODO:

To LAUNCH:
✓ Fix breaking auth refresh errors
✓ Deploy site with Full SSR
✓ Add data column for student login codes
✓ Change Login to Admin Login
✓ Title on main screen – Welcome to Covington Catholic Order Portal
✓ Change Student ID to Student Code
✓ Name change on URL – GBS to Neutral Name
  ✓ Currently on gbs-student-hardware.web.app
  ✓ Verify the move to student-hardware.web.app
✓ Fix weird Z-index buffering on the pop-up that prevents clicking the confirmation button lol
✓ Add User Accounts for CovCath admins again
✓ Add new picture of device and case
✓ Re-add the final real-money API keys

To ADD:  
✓ Add redirect for invalid codes
  ✓ Not neccessary, but would be nice to have for student mis-types
  ✓ Do so by splitting the page into 2 sections, one section loading wheel, one section page content 
  ✓ Once we get the data from the server, we can hide the loading wheel and show the content
  ✓ If it fails we programmatically redirect back home and show a pop-up that that code isn't valid
  
✖ Send confirmation email (through stripe?) when full purchase is confirmed
  ✖ https://dashboard.stripe.com/settings/emails
  ✖ We currently the ability to send emails, but without email info from CovCath they'll be GBS branded
  ✖ Get email credentials from CovCath in order to send through them

✓ Add Searching and Sorting to the admin panel
✓ Add Administrator Notes as a category
✓ Add Auto-rollover of student dates when polling for students pane.
✓ Export Students to CSV

✓ click on a student for full information in a modal


